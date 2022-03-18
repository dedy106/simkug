window.app_saku2_transaksi_sppd_fSpjApp = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_sppd_fSpjApp.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_sppd_fSpjApp";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Verifikasi Pengajuan SPPD: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl");		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this,{bound:[20,16,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_dasar = new saiLabelEdit(this,{bound:[20,18,450,20],caption:"Dasar perj. Dinas", maxLength:100});				
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Maksud/Tujuan", maxLength:150});				
		this.cb_buat = new saiCBBL(this,{bound:[20,15,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});		
		this.cb_app = new saiCBBL(this,{bound:[20,18,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});						
		this.e_jab = new saiLabelEdit(this,{bound:[20,17,300,20],caption:"Jabatan", maxLength:50});				
		this.bTampil = new button(this,{bound:[830,17,80,18],caption:"Tampil Data",click:[this,"doLoad"]});			
		this.bGar = new button(this,{bound:[920,17,80,18],caption:"Anggaran",click:[this,"doClick"]});			
		
		this.pc1 = new pageControl(this,{bound:[20,12,980,300], childPage:["Data SPPD","Data Anggaran","Detail Transport","Detail Uang Harian"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:11,tag:0,
		            colTitle:["Status","No Bukti","No Dokumen","Tanggal","Keterangan","Kode Akun","Kode PP","Kode DRK","Pengaju","Nilai","Periode"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[60,100,150,80,80,80,200,60,100,100,80]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9,10],[]],
					colFormat:[[9],[cfNilai]],buttonStyle:[[0],[bsAuto]], 
					picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],
					change:[this,"doChangeCells"],dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		
		this.sg4 = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Saldo Awal","Nilai","Saldo Akhir"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,100,100,150,80,150,80,150,80]],
					readOnly:true,colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg4});
		this.i_budget = new portalui_imageButton(this.sgn4,{bound:[955,2,20,20],hint:"Lihat Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});
						
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:9,		            
					colTitle:["Kode Jns","Jenis Angkutan","Kode Rute","Nama","Tempat Asal","Tempat Tujuan","Tarif","Jumlah","Nilai"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[80,80,80,155,155,160,70,80,60]],
					readOnly:true,					
					colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],
					defaultRow:1,autoAppend:false});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.sg3 = new saiGrid(this.pc1.childPage[3],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:9,
		            colTitle:["Kd Jenis","Jenis SPPD","Tanggal Berangkat","Tanggal Tiba","Lama Hari","Tarif","Persen","Nilai"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,80,100,120,120,120,200,80]],
					readOnly:true, colFormat:[[2,3,4,5,6,7],[cfDate,cfDate,cfNilai,cfNilai,cfNilai,cfNilai]], defaultRow:1,
					autoAppend:false});
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg3});
			
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);		
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		this.dataAkun = this.app._masakun;
		this.dataPP = this.app._pp;					
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
			
			this.flagGarFree = "0";		
			var data = this.dbLib.getDataProvider("select flag from spro where kode_spro = 'GARFREE' and kode_lokasi = '"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];																	
				this.flagGarFree = line.flag;							
			}			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");			
			
			var data = this.dbLib.getDataProvider("select kode_bidang from pp where kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.kodeBidang = line.kode_bidang;
			} else this.kodeBidang = "-";
			this.cb_buat.setSQL("select a.nik, a.nama from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.kode_bidang='"+this.kodeBidang+"' and b.kode_lokasi='"+this.app._lokasi+"'",["a.nik","a.nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_app.setSQL("select a.nik, a.nama from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.kode_bidang='"+this.kodeBidang+"' and b.kode_lokasi='"+this.app._lokasi+"' "+
							   "union "+
							   "select nik,nama from karyawan where nik in ('630658','580798','612271','622579','561190') ",["a.nik","a.nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_sppd_fSpjApp.extend(window.childForm);
window.app_saku2_transaksi_sppd_fSpjApp.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{				
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_ver_m","no_ver",this.app._lokasi+"-VPD"+this.e_periode.getText().substr(2,4)+".","000"));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("insert into yk_ver_m(no_ver,kode_lokasi,tanggal,keterangan,modul,periode,no_del,nik_buat,nik_app,nik_user,tgl_input,jenis_form,no_dokumen,dasar,jabatan) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','SPPD','"+this.e_periode.getText()+"','-','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.app._userLog+"',now(),'APP','"+this.e_dok.getText()+"','"+this.e_dasar.getText()+"','"+this.e_jab.getText()+"')");
					
					var line;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						if (line.status.toUpperCase() == "APP"){
							sql.add("insert into yk_ver_d(no_ver,modul,kode_lokasi,no_bukti,jenis,catatan,status) values "+
									"('"+this.e_nb.getText()+"','SPPD','"+this.app._lokasi+"','"+line.no_spj+"','-','-','"+line.status+"')");							
							sql.add("update yk_spj_m set no_ver='"+this.e_nb.getText()+"',progress='1' where no_spj='"+line.no_spj+"' and kode_lokasi='"+this.app._lokasi+"'");
						}						
					}									
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+
							"select no_bukti,'VSPPD',kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,'"+this.e_periode.getText()+"','C',0,nilai from angg_r where no_bukti in ("+this.noSPPD+") and kode_lokasi='"+this.app._lokasi+"' and modul ='SPPD'");
					if (this.sg4.getRowValidCount() > 0){
						for (var i=0;i < this.sg4.getRowCount();i++){
							if (this.sg4.rowValid(i)){									
								sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
										"	('"+this.e_nb.getText()+"','VSPPD','"+this.app._lokasi+"','"+this.sg4.cells(0,i)+"','"+this.sg4.cells(2,i)+"','"+this.sg4.cells(4,i)+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','D',"+parseNilai(this.sg4.cells(6,i))+","+parseNilai(this.sg4.cells(7,i))+")");
							}
						}
					}
					setTipeButton(tbAllFalse);					
					this.dbLib.execArraySQL(sql);
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);										
					this.dataJU.rs.rows = [];
					this.sg.clear(1); this.sg2.clear(1); this.sg4.clear(1); this.sg3.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :					
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
				var isAda = false;
				for (var i=0;i < this.dataJU.rs.rows.length;i++){
					if (this.dataJU.rs.rows[i].status.toUpperCase() == "APP") isAda = true;
				}
				if (!isAda){
					system.alert(this,"Transaksi tidak valid.","Tidak ada transaksi dengan status APP.");
					return false;
				}				
				this.doHitungGar();
				if (this.flagGarFree == "0") {
					for (var i=0;i < this.sg4.getRowCount();i++){
						if (nilaiToFloat(this.sg4.cells(7,i))>0 && nilaiToFloat(this.sg4.cells(6,i)) < nilaiToFloat(this.sg4.cells(7,i))) {
							var k =i+1;
							system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi. [Baris : "+k+"]");
							return false;						
						}
					}
				}							
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
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
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
		this.doClick(this.i_gen);
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_ver_m","no_ver",this.app._lokasi+"-VPD"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_dok.setFocus();
		}
		if (sender == this.bGar) {
			this.doHitungGar();
			this.pc1.setActivePage(this.pc1.childPage[1]);
		}
	},
	doChange:function(sender){
		if (sender == this.e_periode) {
			this.dataJU.rs.rows = [];
			this.sg.clear(1); this.sg2.clear(1); this.sg4.clear(1); this.sg3.clear(1);
		}	
		if (sender == this.cb_app && this.cb_app.getText() != "") {			
			var data2 = this.dbLib.getDataProvider("select jabatan from karyawan where nik='"+this.cb_app.getText()+"'",true);
				if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
					var line2 = data2.rs.rows[0];
					this.e_jab.setText(line2.jabatan);
				} else this.e_jab.setText("");				
		}
	},
	doLoad:function(sender){
		/*
		krn anggaran 3 bulann maka per satu TW yang muncul
		if (this.e_periode.getText().substr(4,2) == "01" || this.e_periode.getText().substr(4,2) == "02" || this.e_periode.getText().substr(4,2) == "03") var vPeriode = "'"+this.e_periode.getText().substr(0,4)+"01','"+this.e_periode.getText().substr(0,4)+"02','"+this.e_periode.getText().substr(0,4)+"03'";
		if (this.e_periode.getText().substr(4,2) == "04" || this.e_periode.getText().substr(4,2) == "05" || this.e_periode.getText().substr(4,2) == "06") var vPeriode = "'"+this.e_periode.getText().substr(0,4)+"04','"+this.e_periode.getText().substr(0,4)+"05','"+this.e_periode.getText().substr(0,4)+"06'";
		if (this.e_periode.getText().substr(4,2) == "07" || this.e_periode.getText().substr(4,2) == "08" || this.e_periode.getText().substr(4,2) == "09") var vPeriode = "'"+this.e_periode.getText().substr(0,4)+"07','"+this.e_periode.getText().substr(0,4)+"08','"+this.e_periode.getText().substr(0,4)+"09'";
		if (this.e_periode.getText().substr(4,2) == "10" || this.e_periode.getText().substr(4,2) == "11" || this.e_periode.getText().substr(4,2) == "12" || this.e_periode.getText().substr(4,2) == "13") var vPeriode = "'"+this.e_periode.getText().substr(0,4)+"10','"+this.e_periode.getText().substr(0,4)+"11','"+this.e_periode.getText().substr(0,4)+"12','"+this.e_periode.getText().substr(0,4)+"13'";		
		*/
		
		var strSQL = "select 'INPROG' as status,'-' as catatan,a.no_spj,a.no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.kode_pp,a.kode_drk,a.akun_uhar,a.nik_buat+' - '+c.nama as pengaju,a.transport+a.harian as nilai,a.periode "+
					 "from yk_spj_m a inner join karyawan c on a.nik_buat=c.nik  "+
					 "                inner join pp x on a.kode_pp=x.kode_pp and a.kode_lokasi=x.kode_lokasi "+
					 "where x.kode_bidang = '"+this.kodeBidang+"' and a.progress ='0' and a.periode in ("+this.e_periode.getText()+") and a.kode_lokasi='"+this.app._lokasi+"'";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);		
	},
	doTampilData: function(page) {
		this.sg.clear(); this.sg2.clear(1);
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.status.toUpperCase(),line.no_spj,line.no_dokumen,line.tanggal,line.keterangan,line.akun_uhar,line.kode_pp,line.kode_drk,line.pengaju,floatToNilai(line.nilai),line.periode]);
		}
		this.sg.setNoUrut(start);
	},
	doChangeCells: function(sender, col , row) {
		if (col == 0 ) {
			this.dataJU.rs.rows[((this.page-1)*20) + row].status = this.sg.cells(0,row);			
		}		
	},
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(1,row) != "") {			
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			var strSQL = "select a.kode_trans,a.asal+'-'+a.tujuan as nama,a.nilai,a.asal,a.tujuan,a.kode_jenis,a.tarif,a.jumlah,b.nama as nama_jenis "+
			             "from yk_spj_dt a inner join yk_spj_jenis b on a.kode_jenis=b.kode_jenis  "+
					     "where a.no_spj='"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){				
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.kode_jenis,line.nama_jenis,line.kode_trans,line.nama,line.asal,line.tujuan,floatToNilai(line.tarif),floatToNilai(line.jumlah),floatToNilai(line.nilai)]);
				}
			} else this.sg2.clear(1);
						
			var data = this.dbLib.getDataProvider(
					   "select a.sts_spj,b.nama as nama_spj,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,a.lama,a.tarif,a.persen,a.nilai "+
			           "from yk_spj_dh a inner join yk_status_spj b on a.sts_spj=b.sts_spj "+
					   "where a.no_spj='"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg3.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg3.appendData([line.sts_spj,line.nama_spj,line.tgl_mulai,line.tgl_selesai,floatToNilai(line.lama),floatToNilai(line.tarif),floatToNilai(line.persen),floatToNilai(line.nilai)]);
				}
			} else this.sg3.clear(1);										
			this.pc1.setActivePage(this.pc1.childPage[2]);
		}
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
							system.info(this,"Transaksi telah sukses tersimpan (No Bukti : "+ this.e_nb.getText()+")","");
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doHitungGar: function(){
		this.sg4.clear();
		var nilai = total = 0; 
		this.noSPPD = "";		
		var line;
		for (var i=0;i < this.dataJU.rs.rows.length;i++){
			line = this.dataJU.rs.rows[i];			
			if (line.status.toUpperCase() == "APP" && line.akun_uhar != "-" && line.kode_pp != "-" && line.kode_drk != "-"){						
				this.noSPPD += ",'"+line.no_spj+"'";
				nilai = parseFloat(line.nilai);
				var isAda = false;
				var idx = total = 0;
				for (var j=0;j < this.sg4.getRowCount();j++){
					if (line.akun_uhar == this.sg4.cells(0,j) && line.kode_pp == this.sg4.cells(2,j) && line.kode_drk == this.sg4.cells(4,j)) {
						isAda = true;
						idx = j;
						break;
					}
				}
				if (!isAda) {
					this.sg4.appendData([line.akun_uhar,"-",line.kode_pp,"-",line.kode_drk,"-","0",floatToNilai(line.nilai),"0"]);
				} 
				else { 
					total = nilaiToFloat(this.sg4.cells(7,idx));
					total = total + nilai;
					this.sg4.setCell(7,idx,total);
				}			
			}						
		}		
		this.noSPPD = this.noSPPD.substr(1);			
				
		var sls = garBalik = 0;
		for (var i=0;i < this.sg4.getRowCount();i++){						
			var akun = this.dataAkun.get(this.sg4.cells(0,i));
			if (akun) this.sg4.cells(1,i,akun);
			var pp = this.dataPP.get(this.sg4.cells(2,i));
			if (pp) this.sg4.cells(3,i,pp);			
			var data = this.dbLib.getDataProvider("select nama from drk where kode_drk='"+this.sg4.cells(4,i)+"' and tahun='"+this.e_periode.getText().substr(0,4)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined) this.sg4.cells(5,i,line.nama);				
			}						
			var data2 = this.dbLib.getDataProvider("select sum(nilai) as gar_balik from angg_r where kode_pp='"+this.sg4.cells(2,i)+"' and kode_akun='"+this.sg4.cells(0,i)+"' and kode_drk='"+this.sg4.cells(4,i)+"' and no_bukti in ("+this.noSPPD+") and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data2 == "object" && data.rs.rows[0] != undefined){
				var line2;
				line2 = data2.rs.rows[0];			
				garBalik = parseFloat(line2.gar_balik);
			}						
			var data = this.dbLib.getDataProvider("select fn_cekagg2('"+this.sg4.cells(2,i)+"','"+this.app._lokasi+"','"+this.sg4.cells(0,i)+"','"+this.sg4.cells(4,i)+"','"+this.e_periode.getText()+"') as gar ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				data = line.gar.split(";");
				sls = parseFloat(data[0]) - parseFloat(data[1]) + garBalik;
				this.sg4.cells(6,i,floatToNilai(sls));
				sls = sls - nilaiToFloat(this.sg4.cells(7,i));
				this.sg4.cells(8,i,floatToNilai(sls));
			}
		}				
	}
});
