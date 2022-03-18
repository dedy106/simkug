window.app_saku3_transaksi_sppd_fAppAtas = function(owner)
{
	if (owner)
	{		
		window.app_saku3_transaksi_sppd_fAppAtas.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sppd_fAppAtas";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Approval Atasan", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");				
		uses("saiCBBL",true);
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});		
		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,430], childPage:["Daftar Bukti","Detail Bukti","Detail Transportasi","Detail Uang Harian", "Filter Data"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:14,tag:0,
		            colTitle:["No Aju","Status","NIP PD","Tgl Mulai","Tgl Selesai","Maksud/Tujuan","PP Perintah","Tempat","No Approve","Tgl Input","Kode PP","Progress","Surat Perintah"," "],
					colWidth:[[13,12,11,10,9,8,7,6,5,4,3,2,1,0],[80,120,80,80,110,100,200,200,220,75,75,200,70,100]],
					colHide:[[6,7,8,9,10,11],[true,true,true,true,true,true]],					
					colFormat:[[13],[cfButton]],click:[this,"doSgBtnClick"], colAlign:[[13],[alCenter]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
				
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[320,24,200,20],caption:"Status",items:["APPROVE","RETURN","REJECT"], visible:false, readOnly:true,tag:0});
		
		this.lstatus = new portalui_label(this.pc1.childPage[1],{bound:[20,24,100,18],caption:"Status Approval",underline:true});
		this.rb1 = new portalui_radioButton(this.pc1.childPage[1],{bound:[130,24,100,20],caption:"Approve", change:[this,"doRadioSelected"]});
		this.rb2 = new portalui_radioButton(this.pc1.childPage[1],{bound:[230,24,100,20],caption:"Return",selected:true, change:[this,"doRadioSelected"]});
		this.rb3 = new portalui_radioButton(this.pc1.childPage[1],{bound:[330,24,100,20],caption:"Reject",selected:true, change:[this,"doRadioSelected"]});

		this.e_nb = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"No App", readOnly:true,visible:false});						
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[20,10,550,60],caption:"Catatan",tag:9,readOnly:true});				
		
		this.e_nobukti = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"No PD", readOnly:true});		
		this.e_bidang = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,450,20],caption:"PP Perintah", readOnly:true});				
		this.e_tgl1 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"Tgl Mulai", readOnly:true});
		this.e_tgl2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"Tgl Selesai", readOnly:true});
		this.e_jumhari = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"Jumlah Hari", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});	
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,450,20],caption:"Maksud/Tujuan", readOnly:true});			
		this.e_asal = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,450,20],caption:"Kota Asal", readOnly:true});						
		this.e_tempat = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,450,20],caption:"Kota Tujuan", readOnly:true});				
		this.e_nik = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,450,20],caption:"NIP Pegawai", readOnly:true});
		this.e_nilaiut = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Total Transport", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});	
		this.e_nilaiuh = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"Total U. Harian", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});	

		this.e_nikApp1 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,450,20],caption:"NIP Approve 1", readOnly:true});
		this.e_memo2 = new saiMemo(this.pc1.childPage[1],{bound:[20,18,550,50],caption:"Cattn. Approve 1",tag:9,readOnly:true});				

		this.sg1 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:9,		            
					colTitle:["Kode Jns","Jenis Angkutan","Kode Rute","Nama","Tempat Asal","Tempat Tujuan","Tarif","Jumlah","Nilai"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[80,80,80,160,160,170,70,80,60]],
					readOnly:true,
					colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],
					defaultRow:1,
					autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1});
		this.sg2 = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:0,
					colTitle:["Kd Jenis","Jenis SPPD","Tanggal Berangkat","Tanggal Tiba","Lama Hari","Tarif","Persen","Nilai"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,80,100,120,120,120,200,80]],
					readOnly:true,
					colFormat:[[4,5,6,7],[cfNilai,cfNilai,cfNilai,cfNilai]],
					defaultRow:1,
					autoAppend:false});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});										

		this.cb_nb = new saiCBBL(this.pc1.childPage[4],{bound:[20,12,220,20],caption:"No PD", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[4].rearrangeChild(10, 23);	
				
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();		
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try {			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();	
			this.doLoad();					
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);			
			
			this.e_memo2.setReadOnly(true);
			
		}catch(e){
			systemAPI.alert(e);
		}		
	}
};
window.app_saku3_transaksi_sppd_fAppAtas.extend(window.childForm);
window.app_saku3_transaksi_sppd_fAppAtas.implement({	
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 13)
				{
					this.doDoubleClick(this.sg,13,row);					
				}
		}catch(e){
			alert(e);
		}
	},
	doRadioSelected: function(sender,selected){                     
		if (this.rb1.isSelected()) this.c_status.setText("APPROVE");
		if (this.rb2.isSelected()) this.c_status.setText("RETURN");
		if (this.rb3.isSelected()) this.c_status.setText("REJECT");
    },
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");			
	},
	simpan: function(){			
		try{														
			this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();				
					
					if ((this.progress=="0" && this.stsSimpan==1) || this.progress=="1" || this.progress=="R" || this.progress=="X")  {
						if (this.c_status.getText() == "APPROVE") var vStatus = "1";
						if (this.c_status.getText() == "RETURN") var vStatus = "R"; 
						if (this.c_status.getText() == "REJECT") var vStatus = "X";

						var modul = "PDSS";
						var form = "APPATS";
						var fieldUpdate = " no_app1='"+this.e_nb.getText()+"', ";
					}
					
					if ((this.progress=="1" && this.stsSimpan==1) || this.progress=="2" || this.progress=="B" || this.progress=="Z") {
						if (this.c_status.getText() == "APPROVE") var vStatus = "2";
						if (this.c_status.getText() == "RETURN") var vStatus = "B"; 
						if (this.c_status.getText() == "REJECT") var vStatus = "Z";	
						
						var modul = "PDSS";
						var form = "APPDIR";
						var fieldUpdate = " no_app2='"+this.e_nb.getText()+"', ";
					}

					sql.add("update sp_spj_app_m set no_flag='"+this.e_nb.getText()+"' where no_bukti='"+this.e_nobukti.getText()+"' and no_flag='-' and form='"+form+"' and modul='"+modul+"'");					
					sql.add("insert into sp_spj_app_m (no_app,kode_lokasi,tanggal,periode,tgl_input,nik_user,status,modul,form,no_bukti,catatan,no_flag,nik_bdh,nik_fiat) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"',getdate(),'"+this.app._userLog+"','"+vStatus+"','"+modul+"','"+form+"','"+this.e_nobukti.getText()+"','"+this.e_memo.getText()+"','-','X','X')");
																				
					//---------------- flag bukti					
					sql.add("update sp_spj_m set "+fieldUpdate+" progress='"+vStatus+"' where no_spj='"+this.e_nobukti.getText()+"' ");
					
					if (vStatus == "1") {
						sql.add("insert into pushmessage(  nik, pesan, status, tgl_input, token, os, appid) values "+
								"('"+this.nik_push+"','"+this.e_memo.getText()+"','1',getdate(),'-','-','SPJ')");
					}

					setTipeButton(tbAllFalse);					
					this.dbLib.execArraySQL(sql);	
					this.doLoad();
					this.pc1.setActivePage(this.pc1.childPage[0]);			
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
					this.doClick();
					this.doLoad();					
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.e_memo.setText("");
					this.e_memo2.setText("");
					setTipeButton(tbAllFalse);
				break;
			case "simpan" :	
			case "ubah" :			
				if (this.c_status.getText()=="") {
					system.alert(this,"Transaksi tidak valid.","Status Approval harus dipilih.");
					return false;
				}		
				this.preView = "1";				
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																				
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())){
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				} 
				else 
				this.simpan();				
				break;				
				
			case "simpancek" : this.simpan();			
				break;
				
			case "hapus" :	
				this.preView = "0";
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();									
				sql.add("delete from sp_spj_app_m where no_app='"+this.noAppLama+"' and kode_lokasi='"+this.app._lokasi+"'");	

				if (this.progress == "1" || this.progress == "R" || this.progress == "X") {
					sql.add("update sp_spj_m set no_app2='-',progress='0' where no_spj='"+this.e_nobukti.getText()+"' ");	
				}
				if (this.progress == "2" || this.progress == "B" || this.progress == "Z") {
					sql.add("update sp_spj_m set no_app2='-',progress='1' where no_spj='"+this.e_nobukti.getText()+"' ");	
				}
				setTipeButton(tbAllFalse);					
				this.dbLib.execArraySQL(sql);				
				break;		
			
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		this.cb_nb.setSQL("select a.no_spj as no_bukti, b.keterangan from sp_spj_m a inner join sp_perintah_m b on a. no_perintah = b.no_perintah and a.kode_lokasi=b.kode_lokasi "+
						  "where (a.progress+a.nik_app1='1"+this.app._userLog+"' or a.progress+a.nik_app1='R"+this.app._userLog+"' or a.progress+a.nik_app1='X"+this.app._userLog+"' or a.progress+a.nik_app2='2"+this.app._userLog+"' or a.progress+a.nik_app2='B"+this.app._userLog+"' or a.progress+a.nik_app2='Z"+this.app._userLog+"') ",["no_bukti","keterangan"],false,["No PD","Deskripsi"],"and","Daftar Bukti",true);	

		if (this.stsSimpan == 1) {
			this.doClick();
			this.doLoad();
		}
	},	
	doChange:function(sender){						
		if (sender == this.cb_nb && this.cb_nb.getText() != "") {
			var strSQL = "select a.progress,a.no_spj as no_bukti, "+
						"case a.progress when '1' then 'APPROVE' "+
						"when '2' then 'APPROVE' "+
						"when 'R' then 'RETURN' "+
						"when 'B' then 'RETURN' "+
						"when 'X' then 'REJECT' "+
						"when 'Z' then 'REJECT' "+
						"end as status, "+

						"a.progress,a.no_perintah, "+
						"convert(varchar,d.tgl_mulai,103) as tglawal, convert(varchar,d.tgl_selesai,103) as tglakhir, c.kode_pp+' - '+c.nama as pp,b.keterangan,a.tempat, "+
						"a.nik_spj+' - '+a.nama_spj as nik,a.no_app2,convert(varchar,a.tgl_input,120) as tglinput, "+
						"a.kode_pp,a.nik_app2  "+
						"from sp_spj_m a "+
						"inner join sp_perintah_m b on a.no_perintah = b.no_perintah and a.kode_lokasi=b.kode_lokasi and b.no_batch='-' "+
						"inner join pp c on b.kode_pp=c.kode_pp and b.kode_lokasi=c.kode_lokasi "+	
						
						"inner join ( "+							
						"	select no_spj,min(tgl_mulai) as tgl_mulai,max(tgl_selesai) as tgl_selesai "+
						"	from sp_spj_dh "+
						"	where kode_lokasi='"+this.app._lokasi+"' group by no_spj "+						
						") d on a.no_spj=d.no_spj "+

						"where a.no_spj='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_perintah";

			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);										
			this.pc1.setActivePage(this.pc1.childPage[0]);				
		}
	},
	doClick:function(sender){		
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sp_spj_app_m","no_app",this.app._lokasi+"-APP"+this.e_periode.getText().substr(2,4)+".","0000"));												
		this.e_memo.setFocus();										
	},		
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {			
				this.pc1.setActivePage(this.pc1.childPage[1]);											
				this.c_status.setText(this.sg.cells(1,row));								

				if (this.sg.cells(1,row) == "APPROVE") this.rb1.setSelected(true);									
				if (this.sg.cells(1,row) == "RETURN") this.rb2.setSelected(true);									
				if (this.sg.cells(1,row) == "REJECT") this.rb3.setSelected(true);	

				if (this.sg.cells(1,row) == "INPROG") {
					this.rb1.setSelected(false);					
					this.rb2.setSelected(false);					
					this.rb3.setSelected(false);	
					
					this.c_status.setText("");
				}
				
				this.e_nobukti.setText(this.sg.cells(0,row));												
				this.e_tgl1.setText(this.sg.cells(3,row));
				this.e_tgl2.setText(this.sg.cells(4,row));
				this.e_bidang.setText(this.sg.cells(6,row));
				this.e_ket.setText(this.sg.cells(5,row));
				this.e_tempat.setText(this.sg.cells(7,row));				
				this.e_nik.setText(this.sg.cells(2,row));										
				
				this.noAppLama = this.sg.cells(8,row);						
				this.kodePPBukti = this.sg.cells(10,row);
				this.e_memo.setText(this.sg.cells(5,row));	
				
				this.progress = this.sg.cells(11,row);
				
				var strSQL = "select a.nilai_trans,a.nilai_uhar, b.jum_hari,a.asal "+
							 "from sp_spj_m a inner join sp_perintah_m b on a.no_perintah=b.no_perintah and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_spj = '"+this.e_nobukti.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){					
						this.e_nilaiut.setText(floatToNilai(line.nilai_trans));
						this.e_nilaiuh.setText(floatToNilai(line.nilai_uhar));
						this.e_jumhari.setText(floatToNilai(line.jum_hari));

						this.e_asal.setText(line.asal);
					}
				}

				var strSQL = "select a.kode_trans,a.asal+'-'+a.tujuan as nama,a.nilai,a.asal,a.tujuan,a.kode_jenis,a.tarif,a.jumlah,b.nama as nama_jenis "+
							 "from sp_spj_dt a inner join sp_jenis b on a.kode_jenis=b.kode_jenis  "+
							 "where a.no_spj='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){				
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg1.appendData([line.kode_jenis,line.nama_jenis,line.kode_trans,line.nama,line.asal,line.tujuan,floatToNilai(line.tarif),floatToNilai(line.jumlah),floatToNilai(line.nilai)]);
					}
				} else this.sg1.clear(1);			
				
				
				var strSQL = "select a.sts_spj,b.nama as nama_spj,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,a.lama,a.tarif,a.persen,a.nilai "+
							 "from sp_spj_dh a inner join sp_status b on a.sts_spj=b.sts_spj "+
							 "where a.no_spj='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];													
						this.sg2.appendData([line.sts_spj,line.nama_spj,line.tgl_mulai,line.tgl_selesai,floatToNilai(line.lama),floatToNilai(line.tarif),floatToNilai(line.persen),floatToNilai(line.nilai)]);
					}
				} else this.sg2.clear(1);
				
				var strSQL = "select a.nik_app1+' - '+b.nama as app1,isnull(c.catatan,'-') as cat1 "+
				             "from sp_spj_m a  "+
							 "	   inner join karyawan b on a.nik_app1=b.nik and a.kode_lokasi=b.kode_lokasi "+		
				             "     left join sp_spj_app_m c on a.no_app1=c.no_app "+						             
							 "where a.no_spj = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";	
							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){		
					var line = data.rs.rows[0];				
					if (line != undefined){																						
						this.e_nikApp1.setText(line.app1);						
						this.e_memo2.setText(line.cat1);								
					}else{
						this.e_nikApp1.setText('-');	
						this.e_memo2.setText('-');		
					}
				}

				if (this.sg.cells(1,row) == "INPROG") {
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
				}
				else {
					setTipeButton(tbUbahHapus);
					this.stsSimpan = 0;
				}
				
			}
		} catch(e) {alert(e);}
	},		
	doLoad:function(sender){
		var strSQL = "select a.no_perintah, a.progress,a.no_spj as no_bukti,'INPROG' as status,a.progress, "+
					"convert(varchar,d.tgl_mulai,103) as tglawal, convert(varchar,d.tgl_selesai,103) as tglakhir, c.kode_pp+' - '+c.nama as pp,b.keterangan,a.tempat, "+
					"a.nik_spj+' - '+a.nama_spj as nik,a.no_app2,convert(varchar,a.tgl_input,120) as tglinput, "+
					"a.kode_pp,a.nik_app2  "+
					"from sp_spj_m a "+
					"inner join sp_perintah_m b on a.no_perintah = b.no_perintah and a.kode_lokasi=b.kode_lokasi and b.no_batch='-' "+
					"inner join pp c on b.kode_pp=c.kode_pp and b.kode_lokasi=c.kode_lokasi "+	
					
					"inner join ( "+							
					"	select no_spj,min(tgl_mulai) as tgl_mulai,max(tgl_selesai) as tgl_selesai "+
					"	from sp_spj_dh "+
					"	where kode_lokasi='"+this.app._lokasi+"' group by no_spj "+						
					") d on a.no_spj=d.no_spj "+

					"where (a.progress+a.nik_app1='0"+this.app._userLog+"' or a.progress+a.nik_app2='1"+this.app._userLog+"') and no_app2 = '-' order by a.no_perintah ";

		var data = this.dbLib.getDataProvider(strSQL,true);

		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);	
	},							
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];																			
			this.sg.appendData([line.no_bukti,line.status.toUpperCase(),line.nik,line.tglawal,line.tglakhir,line.keterangan,line.pp,line.tempat,line.no_app2,line.tglinput,line.kode_pp,line.progress,line.no_perintah,"Detail"]); 
		}
		this.sg.setNoUrut(start);
	},
	
	doPager: function(sender, page) {
		this.doTampilData(page);
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_sppd_rptApp2";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_spj='"+this.e_nobukti.getText()+"' ";
								this.filter = this.filter2;
								this.viewer.prepare();
								this.viewer.setVisible(true);
								this.app._mainForm.pButton.setVisible(false);
								this.app._mainForm.reportNavigator.setVisible(true);
								this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
								this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
								this.app._mainForm.reportNavigator.rearrange();
								this.showFilter = undefined;
								this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, 1,  1, this.showFilter, this.app._namalokasi,this.filter2));
								this.page = 1;
								this.allBtn = false;
								this.pc1.hide();
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							} 
						}else system.info(this,result,"");
	    			break;					
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	
	doCloseReportClick: function(sender){
		switch(sender.getName()){
			case "PreviewBtn" :        
				window.open(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
			break;
			case "PrintBtn" :
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
				try
				{
					window.frames[this.viewer.getFullId() +"_iframe"].focus();
					window.frames[this.viewer.getFullId() +"_iframe"].print();
				}catch(e)
				{alert(e);}
			break;
			default :				
				this.pc1.show();   
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();				
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
			this.doClick();
			this.doLoad();					
			this.pc1.setActivePage(this.pc1.childPage[0]);				
			this.e_memo.setText("");
			this.e_memo2.setText("");
			setTipeButton(tbAllFalse);
		} catch(e) {
			alert(e);
		}
	}
});

