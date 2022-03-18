window.app_saku2_transaksi_kb_fSpbVerB = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kb_fSpbVerB.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kb_fSpbVerB";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Verifikasi SPB : Batal", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Keterangan",readOnly:false});				
		this.cb_buat = new saiCBBL(this,{bound:[20,16,220,20],caption:"Dibuat Oleh", readOnly:false});				
		this.cb_spb = new saiCBBL(this,{bound:[20,17,220,20],caption:"No SPB",readOnly:false});
		this.e_total = new saiLabelEdit(this,{bound:[780,17,220,20],caption:"Nilai SPB", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
				
		this.pc1 = new pageControl(this,{bound:[20,18,980,350], childPage:["Data Item Akun SPB","Akun Verifikasi","Detail Transfer"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[150,80,150,80,100,200,50,150,80]],										
					readOnly:true,
					colFormat:[[4],[cfNilai]],nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg});		
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Keterangan","DC","Nilai"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,50,200,150,80,150,80,150,80]],					
					colFormat:[[8],[cfNilai]],
					readOnly:true,nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});		
		this.cb1 = new portalui_checkBox(this.sgn2,{bound:[920,5,100,25],caption:"Preview",selected:false});
		
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[2],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:6,tag:9,
				colTitle:["Mitra","Bank","Cabang","No Rekening","Nama Rekening","Nilai"],				
				colWidth:[[5,4,3,2,1,0],[80,180,100,200,60,150]],colFormat:[[5],[cfNilai]],readOnly:true, defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll, grid:this.sg1, pager:[this,"doPager"]});		
		
		this.rearrangeChild(10, 23);
					
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbHapus);
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
			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");			
						
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);												
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kb_fSpbVerB.extend(window.childForm);
window.app_saku2_transaksi_kb_fSpbVerB.implement({
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
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
													
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
					this.sg.clear(1); this.sg2.clear(1); 
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbHapus);
				break;
			case "hapus" :	
					this.nilai=0;
					for (var i = 0; i < this.sg2.rows.getLength();i++){
						if (this.sg2.rowValid(i) && this.sg2.cells(8,i) != ""){
							if (this.sg2.cells(7,i) == "D") this.nilai += nilaiToFloat(this.sg2.cells(8,i));
							if (this.sg2.cells(7,i) == "C") this.nilai -= nilaiToFloat(this.sg2.cells(8,i));
						}
					}
					this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
					if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
						return false;
					}	
					else {	
						uses("server_util_arrayList");
						var sql = new server_util_arrayList();						
						sql.add("update yk_spb_m set nilai="+this.nilai+",no_ver='-' where no_spb='"+this.cb_spb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from yk_spbver_m where no_ver = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from yk_spb_j where jenis='VER' and no_spb='"+this.cb_spb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						setTipeButton(tbAllFalse);	
						this.dbLib.execArraySQL(sql);
					}
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
	},
	doChange:function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="") {						
			this.e_nb.setSQL("select a.no_ver, a.keterangan from yk_spbver_m a inner join yk_spb_m b on a.no_ver=b.no_ver and a.kode_lokasi=b.kode_lokasi "+
							 "where b.no_kas='-' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_ver","a.keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);			
		}		
		if (sender == this.e_nb && this.e_nb.getText()!="") {			
			var data = this.dbLib.getDataProvider(
						"select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,a.jenis, "+
						"       z.tanggal,z.keterangan as ket_ver,z.nik_buat,x.no_spb,x.keterangan as ket_spb,zz.nama as nama_buat "+
						"from yk_spb_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"            	 inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						"            	 inner join yk_spb_m x on a.no_spb=x.no_spb and a.kode_lokasi=x.kode_lokasi "+
						"            	 inner join yk_spbver_m z on x.no_ver=z.no_ver and z.kode_lokasi=x.kode_lokasi "+
						"            	 inner join karyawan zz on z.nik_buat=zz.nik and z.kode_lokasi=zz.kode_lokasi "+
						"                left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
						"where z.no_ver = '"+this.e_nb.getText()+"' and z.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					if (line.jenis != "VER")
						this.sg.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
					else
						this.sg2.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,line.keterangan,line.dc,floatToNilai(line.nilai)]);					
				}
				this.dp_d1.setText(line.tanggal);													
				this.e_ket.setText(line.ket_ver);
				this.cb_buat.setText(line.nik_buat,line.nama_buat);
				this.cb_spb.setText(line.no_spb,line.ket_spb);
			} else {this.sg.clear(1); this.sg2.clear(1);}
			this.sg2.validasi();
			
			var strSQL = "select a.keterangan,a.nama_rek,a.no_rek,a.bank,a.cabang,a.jenis,a.nilai from yk_spb_d a where a.no_spb='"+this.cb_spb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);	
			
		}			
	},		
	doTampilData: function(page) {
		this.sg1.clear(); 
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg1.appendData([line.keterangan,line.bank,line.cabang,line.no_rek,line.nama_rek,floatToNilai(line.nilai)]);
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doNilaiChange: function(){
		try{			
			var tot=0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(4,i) != ""){
					if (this.sg.cells(2,i)=="D") tot += nilaiToFloat(this.sg.cells(4,i));
					if (this.sg.cells(2,i)=="C") tot -= nilaiToFloat(this.sg.cells(4,i));
				}
			}
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(8,i) != ""){
					if (this.sg2.cells(7,i)=="D") tot += nilaiToFloat(this.sg2.cells(8,i));	
					if (this.sg2.cells(7,i)=="C") tot -= nilaiToFloat(this.sg2.cells(8,i));	
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
							system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
							this.clearLayar();
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
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();
				
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); this.sg2.clear(1); 
			this.pc1.setActivePage(this.pc1.childPage[0]);
			setTipeButton(tbHapus);
		} catch(e) {
			alert(e);
		}
	}
});