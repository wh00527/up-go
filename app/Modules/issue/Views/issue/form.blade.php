{!! Form::hidden('issue_id', $issue ? $issue->id : null) !!}
{!! Form::label('rental_id', ucfirst('rental')) !!}
@include('rental::rental.select', ['rental' => $issue ? $issue->rental->first() : null, 'rentals' => $rentals])
{!! Form::label('issue_status', ucfirst('status')) !!}
{!! Form::text('issue_status', $issue ? $issue->status : '', ['class' => 'form-control']) !!}
{!! Form::label('user_id', ucfirst('requester')) !!}
@include('user::user.select', ['user' => $issue ? $issue->requester : null, 'users' => $users, 'saveItem' => 'requester_'])
@foreach(($issue && $issue->details->count() > 0) ? $issue->details->all() : [null] as $detail)
    <hr/>
    {!! Form::label('issue_detail_' . ($detail ? $detail->id : 'new') . '_type', ucfirst('type')) !!}
    {!! Form::text('issue_detail_' . ($detail ? $detail->id : 'new') . '_type', $detail ? $detail->type : '', ['class' => 'form-control']) !!}
    {!! Form::label('issue_detail_' . ($detail ? $detail->id : 'new') . '_priority', ucfirst('priority')) !!}
    {!! Form::text('issue_detail_' . ($detail ? $detail->id : 'new') . '_priority', $detail ? $detail->priority : '', ['class' => 'form-control']) !!}
    {!! Form::label('issue_detail_' . ($detail ? $detail->id : 'new') . '_content', ucfirst('content')) !!}
    {!! Form::textarea('issue_detail_' . ($detail ? $detail->id : 'new') . '_content', $detail ? $detail->content : '', ['class' => 'form-control']) !!}
    {!! Form::label('issue_detail_' . ($detail ? $detail->id : 'new') . '_3rdParty', ucfirst('3rdParty')) !!}
    {!! Form::text('issue_detail_' . ($detail ? $detail->id : 'new') . '_3rdParty', $detail ? $detail['3rdParty'] : '', ['class' => 'form-control']) !!}
    @include('message::media.form', ['media' => $detail ? $detail->media()->get()->all() : [], 'saveItem' => 'issue_detail_' . ($detail ? $detail->id : 'new') . '_'])
@endforeach