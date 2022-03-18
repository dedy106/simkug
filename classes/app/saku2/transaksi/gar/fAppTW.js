window.app_saku2_transaksi_gar_fAppTW = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_gar_fAppTW.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_gar_fAppTW";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form SUKKA Anggaran Triwulan: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;tinymceCtrl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Approve",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.c_tw = new saiCB(this,{bound:[20,22,202,20],caption:"Triwulan",items:["TW I","TW II","TW III","TW IV"], readOnly:true,tag:2,change:[this,"doChange"]});	
		this.cb_bidang = new saiCBBL(this,{bound:[20,13,200,20],caption:"Bidang", multiSelection:false, maxLength:10, tag:2});		
		this.cb_lokasi = new saiCBBL(this,{bound:[20,14,200,20],caption:"Lokasi", multiSelection:false, maxLength:10, tag:2});		
		this.cb_buat = new saiCBBL(this,{bound:[20,15,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});		
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});				
		this.cb_draft = new saiCBBL(this,{bound:[20,20,220,20],caption:"Draft SUKKA", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]});
		this.bTampil = new button(this,{bound:[840,20,80,18],caption:"Tampil Data",click:[this,"doLoad"]});			
		
		this.pc1 = new pageControl(this,{bound:[20,12,900,287], childPage:["Data Rekapitulasi","Detail Anggaran","SUKKA"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:2,tag:0,
		            colTitle:["Kode","Nilai"],colFormat:[[1],[cfNilai]],
					colWidth:[[1,0],[300,80]],
					readOnly:true,dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});
					
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:9,tag:9,
					colTitle:["Bulan","Kode PP","Nama PP","Kode DRK","Nama DRK","Kode Akun","Nama Akun","Jenis","Nilai"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,80,200,70,200,60,150,70,50]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8],[]],
					colFormat:[[8],[cfNilai]],
					defaultRow:1,autoAppend:false});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg2});
		this.mUraian = new tinymceCtrl(this.pc1.childPage[2],{bound:[1,10,this.pc1.width-5,this.pc1.height-25], withForm:false});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='JUAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");		
			
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);						
			this.cb_bidang.setSQL("select kode_bidang, nama from bidang ",["kode_bidang","nama"],false,["Kode","Nama"],"where","Data Bidang",true);			
			this.cb_lokasi.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi <> '00'",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);			
			this.cb_draft.setSQL("select kode_draft, nama from rra_draft where kode_lokasi<>'00'",["kode_draft","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);				
			
			this.cb_lokasi.setText(this.app._lokasi);
			if (this.app._lokasi != "99") {
				system.alert(this,"Hakakses tidak diperkenankan.","SUKKA harus di lokasi PUSAT.");
				setTipeButton(tbAllFalse);	
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_gar_fAppTW.extend(window.childForm);
window.app_saku2_transaksi_gar_fAppTW.implement({
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
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"rra_sukka","no_sukka",this.app._lokasi+"-SKTW"+this.e_periode.getText().substr(2,4)+".","000"));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
					sql.add("insert into rra_sukka(no_sukka,kode_lokasi,tanggal,keterangan,modul,periode,nik_buat,nik_app,no_pdrk,uraian,kode_loksukka,kode_bidang) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','SUKKATW','"+this.e_periode.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','-','"+urlencode(this.mUraian.getCode())+"','"+this.cb_lokasi.getText()+"','"+this.cb_bidang.getText()+"')");
									
					if (this.c_tw.getText() == "TW I") var vPeriode = "'"+this.e_periode.getText().substr(0,4)+"01','"+this.e_periode.getText().substr(0,4)+"02','"+this.e_periode.getText().substr(0,4)+"03'";
					if (this.c_tw.getText() == "TW II")  var vPeriode = "'"+this.e_periode.getText().substr(0,4)+"04','"+this.e_periode.getText().substr(0,4)+"05','"+this.e_periode.getText().substr(0,4)+"06'";
					if (this.c_tw.getText() == "TW III")  var vPeriode = "'"+this.e_periode.getText().substr(0,4)+"07','"+this.e_periode.getText().substr(0,4)+"08','"+this.e_periode.getText().substr(0,4)+"09'";
					if (this.c_tw.getText() == "TW IV")  var vPeriode = "'"+this.e_periode.getText().substr(0,4)+"10','"+this.e_periode.getText().substr(0,4)+"11','"+this.e_periode.getText().substr(0,4)+"12'";
					sql.add("update anggaran_d set no_sukka='"+this.e_nb.getText()+"' where no_sukka='-' and substring(kode_pp,3,1)='"+this.cb_bidang.getText()+"' and kode_lokasi ='"+this.cb_lokasi.getText()+"' and periode in ("+vPeriode+")");
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
					this.sg.setTag("0");
					this.dataJU.rs.rows = [];
					this.sg.clear(1); this.sg2.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :					
					this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		this.doClick(this.i_gen);
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"rra_sukka","no_sukka",this.app._lokasi+"-SKTW"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_ket.setFocus();
		}		
	},
	doChange:function(sender){
		if (sender == this.e_periode) {
			this.dataJU.rs.rows = [];
			this.sg.clear(1); this.sg2.clear(1);
		}		
		if (sender == this.cb_draft && this.cb_draft.getText()!="") {
			var data = this.dbLib.getDataProvider("select keterangan from rra_draft where kode_draft = '"+this.cb_draft.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'  ",true);
			if (typeof data != "string" && data.rs.rows[0] != undefined){				
				this.mUraian.setCode(urldecode(data.rs.rows[0].keterangan));
			}
		}
	},
	doTampilData: function(page) {
		this.sg.clear(); this.sg2.clear(1);
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.kode,floatToNilai(line.nilai)]);
		}
		this.sg.setNoUrut(start);
	},
	doLoad:function(sender){		
		if (this.c_tw.getText() == "TW I") var vPeriode = "'"+this.e_periode.getText().substr(0,4)+"01','"+this.e_periode.getText().substr(0,4)+"02','"+this.e_periode.getText().substr(0,4)+"03'";
		if (this.c_tw.getText() == "TW II")  var vPeriode = "'"+this.e_periode.getText().substr(0,4)+"04','"+this.e_periode.getText().substr(0,4)+"05','"+this.e_periode.getText().substr(0,4)+"06'";
		if (this.c_tw.getText() == "TW III")  var vPeriode = "'"+this.e_periode.getText().substr(0,4)+"07','"+this.e_periode.getText().substr(0,4)+"08','"+this.e_periode.getText().substr(0,4)+"09'";
		if (this.c_tw.getText() == "TW IV")  var vPeriode = "'"+this.e_periode.getText().substr(0,4)+"10','"+this.e_periode.getText().substr(0,4)+"11','"+this.e_periode.getText().substr(0,4)+"12'";
		
		var strSQL = "select substring(kode_akun,1,4) as kode, "+
					 "sum(case dc when 'D' then nilai else -nilai end) as nilai "+
					 "from anggaran_d where substring(kode_pp,3,1)='"+this.cb_bidang.getText()+"' and kode_lokasi ='"+this.cb_lokasi.getText()+"' and periode in ("+vPeriode+") and no_sukka='-' "+
					 "group by substring(kode_akun,1,4)";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);		
	},
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(1,row) != "") {
			this.sg2.clear();
			if (this.c_tw.getText() == "TW I") var vPeriode = "'"+this.e_periode.getText().substr(0,4)+"01','"+this.e_periode.getText().substr(0,4)+"02','"+this.e_periode.getText().substr(0,4)+"03'";
			if (this.c_tw.getText() == "TW II")  var vPeriode = "'"+this.e_periode.getText().substr(0,4)+"04','"+this.e_periode.getText().substr(0,4)+"05','"+this.e_periode.getText().substr(0,4)+"06'";
			if (this.c_tw.getText() == "TW III")  var vPeriode = "'"+this.e_periode.getText().substr(0,4)+"07','"+this.e_periode.getText().substr(0,4)+"08','"+this.e_periode.getText().substr(0,4)+"09'";
			if (this.c_tw.getText() == "TW IV")  var vPeriode = "'"+this.e_periode.getText().substr(0,4)+"10','"+this.e_periode.getText().substr(0,4)+"11','"+this.e_periode.getText().substr(0,4)+"12'";
		
			var strSQL = "select substring(a.periode,5,2) as bulan,a.kode_pp,b.nama as nama_pp,a.kode_drk,d.nama as nama_drk,a.kode_akun,c.nama as nama_akun,a.nilai,a.dc  "+
						 "from anggaran_d a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "				    inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
						 "				    inner join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4)  "+
						 "where a.no_sukka='-' and a.periode in ("+vPeriode+") and a.kode_akun like '"+this.sg.cells(0,row)+"%' and a.kode_lokasi = '"+this.cb_lokasi.getText()+"' and substring(a.kode_pp,3,1) = '"+this.cb_bidang.getText()+"' and a.no_sukka='-' order by substring(a.periode,5,2),a.dc desc";					

			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.bulan,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,line.kode_akun,line.nama_akun,line.dc.toUpperCase(),floatToNilai(line.nilai)]);
				}
			} else this.sg2.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[1]);
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
	}
});
