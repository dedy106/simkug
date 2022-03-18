window.app_saku3_transaksi_ppbs_fPaEvalAkunPP = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ppbs_fPaEvalAkunPP.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_ppbs_fPaEvalAkunPP";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Evaluasi Usulan Anggaran per PP: Input", 0);	
		
		uses("portalui_uploader;saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.c_tahun = new saiCB(this,{bound:[20,22,202,20],caption:"Tahun",readOnly:true,tag:2});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.cb_app = new saiCBBL(this,{bound:[20,19,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.cb_pp = new saiCBBL(this,{bound:[20,17,200,20],caption:"PP/Unit", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.cb_akun = new saiCBBL(this,{bound:[20,18,200,20],caption:"Akun Anggaran", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});		
		this.e_eval = new saiLabelEdit(this,{bound:[700,18,220,20],caption:"Nilai Evaluasi", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});
		this.e_persen = new saiLabelEdit(this,{bound:[20,17,180,20],caption:"Persentase (+/-)", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		this.i_hitung = new portalui_imageButton(this,{bound:[205,17,20,20],hint:"Hitung",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_total = new saiLabelEdit(this,{bound:[700,17,220,20],caption:"Total Usulan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
		
		this.p1 = new panel(this,{bound:[20,23,900,354],caption:"Daftar Usulan Anggaran"});							
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-45],colCount:14,tag:0,
		            colTitle:["Kode DRK","Nama DRK","Kode Norma","Keterangan","Kode Akun","Rincian Kegiatan","Sat","Bulan","Tarif","Jumlah","Vol","Total","Vol Baru","Total Baru"],
					colWidth:[[13,12,11,10,9,8,7,6,5,4,3,2,1,0],[100,50,100,50,50,50,50,50,250,60,150,80,150,80]],					
					readOnly:true,
					colFormat:[[8,9,10,11,12,13],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],					
					nilaiChange:[this,"doNilaiChange"],
					autoPaging:true, rowPerPage:20,autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});				
		
		this.rearrangeChild(10, 23);
					
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();				
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.cb_akun.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"' and block='0'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);			
						
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='GARAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");						
			this.c_tahun.items.clear();
			var data = this.dbLib.getDataProvider("select year(getdate()) as tahun union select year(getdate())+1 as tahun order by tahun desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_tahun.addItem(i,line.tahun);
				}
			}		
			this.cb_pp.setSQL("select kode_pp, nama from agg_pp where tahun='"+this.c_tahun.getText()+"' and flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_ppbs_fPaEvalAkunPP.extend(window.childForm);
window.app_saku3_transaksi_ppbs_fPaEvalAkunPP.implement({	
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
			this.doClick(this.i_gen);
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("insert into agg_eval_m(no_eval,kode_lokasi,tahun,tanggal,keterangan,nik_app,tgl_input,nik_user) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.c_tahun.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_app.getText()+"',getdate(),'"+this.app._userLog+"')");										
					sql.add("insert into agg_eval_d(no_eval,kode_lokasi,kode_akun,persen,bulan) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_akun.getText()+"',"+nilaiToFloat(this.e_persen.getText())+",'-')");
							
					sql.add("update agg_d set vol=vol+((vol * "+nilaiToFloat(this.e_persen.getText())+")/100), "+
							"                 total=round(total+((total * "+nilaiToFloat(this.e_persen.getText())+")/100),0)  "+
							"where kode_pp='"+this.cb_pp.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and periode like '"+this.c_tahun.getText()+"%' and kode_akun='"+this.cb_akun.getText()+"' and modul='UMUM'");						 
					
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
					this.sg.clear(1); 
					setTipeButton(tbSimpan);
				break;
			case "simpan" :				
				this.doClick(this.i_hitung);
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				/*
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
					return false;						
				}				 
				else
				*/
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},
	doSelectDate: function(sender, y,m,d){		
		
		
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"agg_eval_m","no_eval",this.app._lokasi+"-EVAL"+this.c_tahun.getText()+".","000"));
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
		}
		if (sender == this.i_hitung) {			
			for (var j=0;j < this.dataJU.rs.rows.length;j++){					
				this.dataJU.rs.rows[j].vol_baru = parseFloat(this.dataJU.rs.rows[j].vol) + (parseFloat(this.dataJU.rs.rows[j].vol) * nilaiToFloat(this.e_persen.getText())/100);					
				this.dataJU.rs.rows[j].total_baru = Math.round(parseFloat(this.dataJU.rs.rows[j].total) + (parseFloat(this.dataJU.rs.rows[j].total) * nilaiToFloat(this.e_persen.getText())/100));										
			}			
			this.doTampilData(1);
			var tot = 0;			
			for (var i=0;i < this.dataJU.rs.rows.length;i++){			
				line = this.dataJU.rs.rows[i];
				tot = tot + parseFloat(line.total);
			}		
			this.e_total.setText(floatToNilai(tot));			
		}		
	},
	doChange:function(sender){		
		if (sender == this.e_persen && this.e_persen.getText()!="") {
			for (var j=0;j < this.dataJU.rs.rows.length;j++){					
				this.dataJU.rs.rows[j].vol_baru = parseFloat(this.dataJU.rs.rows[j].vol);					
				this.dataJU.rs.rows[j].total_baru = parseFloat(this.dataJU.rs.rows[j].total);					
			}
		}
		if (sender == this.e_eval && this.e_eval.getText()!="" && this.e_total.getText()!="" && this.e_eval.getText()!="0") {			
			var persen = ((nilaiToFloat(this.e_eval.getText()) - nilaiToFloat(this.e_total.getText())) / nilaiToFloat(this.e_total.getText())) * 100;
			this.e_persen.setText(floatToNilai(persen));
		}
		if ((sender == this.cb_akun || sender == this.cb_pp) && this.cb_akun.getText()!="" && this.cb_pp.getText()!="") {
			var strSQL = "select a.kode_drk,a.kode_norma,a.kode_akun,a.keterangan,a.satuan,substring(a.periode,5,2) as bulan,a.tarif,a.jumlah,a.vol,a.total, "+
						 "b.nama as nama_drk, '-' as nama_norma,vol as vol_baru,total as total_baru "+
			             "from agg_d a inner join agg_drk b on a.kode_drk=b.kode_drk and a.kode_lokasi=b.kode_lokasi and substring(a.periode,1,4)=b.tahun "+						 
						 "where a.kode_pp='"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.periode like '"+this.c_tahun.getText()+"%' and a.kode_akun='"+this.cb_akun.getText()+"' ";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				var line;			
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);	
			
			var tot = 0;			
			for (var i=0;i < this.dataJU.rs.rows.length;i++){			
				line = this.dataJU.rs.rows[i];
				tot = tot + parseFloat(line.total);
			}		
			this.e_total.setText(floatToNilai(tot));			
		}
	},
	doTampilData: function(page) {
		var line;
		this.sg.clear();
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.kode_drk,line.nama_drk,line.kode_norma,line.nama_norma,line.kode_akun,line.keterangan,line.satuan,line.bulan,floatToNilai(line.tarif),floatToNilai(line.jumlah),floatToNilai(line.vol),floatToNilai(line.total),floatToNilai(line.vol_baru),floatToNilai(line.total_baru)]);
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doNilaiChange: function(){
		try{
			var tot=0;
			for (var i = 0; i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i) && this.sg.cells(11,i) != ""){
					tot += nilaiToFloat(this.sg.cells(11,i));					
				}
			}
			this.e_total.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},				
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (No : "+ this.e_nb.getText()+")");							
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