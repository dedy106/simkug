window.app_saku3_transaksi_cianjur_proyek_fPtgVer = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_cianjur_proyek_fPtgVer.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_cianjur_proyek_fPtgVer";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Verifikasi Pertanggungan Panjar", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Verifikasi",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		
		this.pc1 = new pageControl(this,{bound:[20,18,980,460], childPage:["Data Pertanggungan","Detail Pertanggungan","Filter Cari"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:12,tag:0,
		            colTitle:["Status","No Ptg","Tanggal","No Dokumen","No Panjar","Nilai PJ","Nilai Ptg","Nilai KB","Keterangan","Pemegang","PP","Status Ptg"],
					colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[80,100,100,200,80,80,80,100,100,80,100,80]],
					readOnly:true,colFormat:[[5,6,7],[cfNilai,cfNilai,cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
						
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,10,202,20],caption:"Status Approval",items:["APPROVE","RETURN"], readOnly:true,tag:2,change:[this,"doChange"]});
		this.e_noptg = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,450,20],caption:"No Ptg", readOnly:true});						
		this.e_dok = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,13,450,20],caption:"No Dokumen", readOnly:true});						
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,450,20],caption:"Deskripsi", readOnly:true});								
		this.e_nik = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,15,450,20],caption:"Pemegang PJ", readOnly:true});										
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[20,12,450,60],caption:"Catatan",tag:9,readOnly:true});
		this.e_npj = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,12,200,20],caption:"Nilai PJ", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
		this.e_total = new saiLabelEdit(this.pc1.childPage[1],{bound:[770,12,200,20],caption:"Nilai KasBank", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
		
		this.e_noptg2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,13,300,20],caption:"No Ptg",maxLength:20,tag:9});
        this.bLoad = new button(this.pc1.childPage[2],{bound:[120,14,80,18],caption:"Cari Data",click:[this,"doCari"]});	
	
		this.sg3 = new saiGrid(this.pc1.childPage[1],{bound:[5,5,this.pc1.width-18,this.pc1.height-180],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode Proyek","Nama Proyek"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[150,80,150,80,100,200,50,150,80]],										
					readOnly:true,colFormat:[[4],[cfNilai]],nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});				

		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);
		this.e_status = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,100,200,20],caption:"Status Ptg",tag:1, readOnly:true});	

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
			this.stsSimpan=1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_cianjur_proyek_fPtgVer.extend(window.childForm);
window.app_saku3_transaksi_cianjur_proyek_fPtgVer.implement({
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
			if(this.stsSimpan==1){
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"ver_m","no_ver",this.app._lokasi+"-VER"+this.e_periode.getText().substr(2,4)+".","000"));
			}				
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();	
					if(this.stsSimpan==0){
						sql.add("delete from ver_m where no_ver='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from ver_d where no_ver='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("update panjarptg2_m set progress='0',no_ver='-' where no_ptg='"+this.e_noptg.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");									
					}	

					if (this.c_status.getText()=="APPROVE")  var prog = "2";
					if (this.c_status.getText()=="RETURN")  var prog = "R";
					
					sql.add("update a set no_verseb ='"+this.e_nb.getText()+"' "+
					        "from ver_m a inner join ver_d b on a.no_ver=b.no_ver and a.kode_lokasi=b.kode_lokasi and a.no_verseb='-' "+
							"where b.no_bukti ='"+this.e_noptg.getText()+"' and b.modul='PJPTG2' and b.kode_lokasi='"+this.app._lokasi+"'");
							
					sql.add("update panjarptg2_m set progress='"+prog+"',no_ver='"+this.e_nb.getText()+"' where no_ptg='"+this.e_noptg.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into ver_m (no_ver,tanggal,kode_lokasi,periode,nik_user,tgl_input,status,modul,no_verseb) values "+
						    "('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.c_status.getText()+"','PJPTG2','-')");
					
					sql.add("insert into ver_d (no_ver,status,modul,no_bukti,kode_lokasi,catatan) values "+
						    "('"+this.e_nb.getText()+"','"+prog+"','PJPTG2','"+this.e_noptg.getText()+"','"+this.app._lokasi+"','"+this.e_memo.getText()+"')");					
					
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
					this.sg.clear(1); this.sg3.clear(1);  
					this.doClick();
					this.doLoad();
					this.e_memo.setText("-");
					this.pc1.setActivePage(this.pc1.childPage[0]);					
					setTipeButton(tbSimpan);
				break;
			case "simpan" :		
			case "ubah"  :
				this.preView="1";
				// if(this.stsSimpan==0){
				// 	if (nilaiToFloat(this.e_total.getText()) <= 0) {
				// 		system.alert(this,"Transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
				// 		return false;						
				// 	}
				// }

				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				/*
				if (this.standarLib.doCekPeriode(this.dbLib,"KB",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (KB - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}
				*/
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
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				/*
				if (this.standarLib.doCekPeriode(this.dbLib,"KB",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (KB - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}
				*/
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}  
				else{
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();								
					sql.add("delete from ver_m where no_ver='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from ver_d where no_ver='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");															
					sql.add("update panjarptg2_m set progress='0',no_ver='-' where no_ptg='"+this.e_noptg.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
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
		this.doClick();
		this.doLoad();
	},	
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"ver_m","no_ver",this.app._lokasi+"-VER"+this.e_periode.getText().substr(2,4)+".","000"));		
	},
	doNilaiChange: function(){
		try{			
			var tot=0;
			for (var i = 0; i < this.sg3.rows.getLength();i++){
				if (this.sg3.rowValid(i) && this.sg3.cells(4,i) != ""){
					if (this.sg3.cells(2,i)=="C") tot += nilaiToFloat(this.sg3.cells(4,i));
					if (this.sg3.cells(2,i)=="D") tot -= nilaiToFloat(this.sg3.cells(4,i));
				}
			}						
			this.e_total.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(0,row) != "") {	
			if(this.sg.cells(0,row).toUpperCase()=='INPROG'){
				this.stsSimpan=1;
				setTipeButton(tbSimpan);
			}else{
				this.stsSimpan=0;
				this.e_memo.setText("-");				
				var data = this.dbLib.getDataProvider("select no_ver from ver_d where no_bukti = '"+this.sg.cells(1,row)+"' and kode_lokasi='"+this.app._lokasi+"' ",true);
				
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					line=data.rs.rows[0];
					this.e_nb.setText(line.no_ver);
				}
				setTipeButton(tbUbahHapus);	
			}	
			this.pc1.setActivePage(this.pc1.childPage[1]);			
			this.e_noptg.setText(this.sg.cells(1,row));
			this.e_dok.setText(this.sg.cells(3,row));			
			this.e_ket.setText(this.sg.cells(8,row));			
			this.e_nik.setText(this.sg.cells(9,row));
			this.e_npj.setText(this.sg.cells(5,row));
			this.e_status.setText(this.sg.cells(11,row));		
			
			this.tgl = this.sg.cells(2,row).substr(6,4)+"-"+this.sg.cells(2,row).substr(3,2)+"-"+this.sg.cells(2,row).substr(0,2);
			this.e_memo.setText("-");				
			var data = this.dbLib.getDataProvider(
						"select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_proyek,d.nama as nama_proyek "+
						"from pr_beban_d a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						" inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						" left join pr_proyek d on a.kode_proyek=d.kode_proyek and a.kode_lokasi=d.kode_lokasi "+
						"where a.no_bukti = '"+this.e_noptg.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg3.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg3.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_proyek,line.nama_proyek]);
				}
			} else this.sg3.clear(1);			
			this.sg3.validasi();
			
										
		}
	},
	doCari:function(sender){								
		try {
			var filter='';
			if (this.e_noptg2.getText() != "") {
				filter = " a.no_ptg like '%"+this.e_noptg2.getText()+"%' ";
			}
			if(filter != ''){
				var strSQL = "select case a.progress when '0' then 'INPROG' when '2' then 'APPROVE' else 'RETURN' end as status,no_ptg,convert(varchar,a.tanggal,103) as tanggal,a.no_panjar,a.no_dokumen,a.nilai_pj,a.nilai,a.nilai_kas,a.keterangan,d.nik_buat+'-'+c.nama as pemegang,b.kode_pp+' - '+b.nama as pp,a.status as sts_pj "+
				"from panjarptg2_m a "+
				"inner join panjar2_m d on a.no_panjar=d.no_panjar and a.kode_lokasi=d.kode_lokasi "+
				"inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
				"inner join karyawan c on d.nik_buat=c.nik and d.kode_lokasi=c.kode_lokasi "+
				"where a.kode_lokasi='"+this.app._lokasi+"' and a.tanggal<='"+this.dp_d1.getDateString()+"' and a.progress in ('2','R','0') "+	
				"and "+filter;
			}else{
				var strSQL = "select case a.progress when '0' then 'INPROG' when '2' then 'APPROVE' else 'RETURN' end as status,no_ptg,convert(varchar,a.tanggal,103) as tanggal,a.no_panjar,a.no_dokumen,a.nilai_pj,a.nilai,a.nilai_kas,a.keterangan,d.nik_buat+'-'+c.nama as pemegang,b.kode_pp+' - '+b.nama as pp,a.status as sts_pj "+
				"from panjarptg2_m a "+
				"inner join panjar2_m d on a.no_panjar=d.no_panjar and a.kode_lokasi=d.kode_lokasi "+
				"inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
				"inner join karyawan c on d.nik_buat=c.nik and d.kode_lokasi=c.kode_lokasi "+
				"where a.kode_lokasi='"+this.app._lokasi+"' and a.tanggal<='"+this.dp_d1.getDateString()+"' and a.progress in ('2','R','0') ";
			}
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} 
		catch(e) {
			alert(e);
		}
	},
	doLoad:function(sender){		
		var strSQL = "select case a.progress when '0' then 'INPROG' when '2' then 'APPROVE' else 'RETURN' end as status,no_ptg,convert(varchar,a.tanggal,103) as tanggal,a.no_panjar,a.no_dokumen,a.nilai_pj,a.nilai,a.nilai_kas,a.keterangan,d.nik_buat+'-'+c.nama as pemegang,b.kode_pp+' - '+b.nama as pp,a.status as sts_pj "+
		             "from panjarptg2_m a "+
					 "inner join panjar2_m d on a.no_panjar=d.no_panjar and a.kode_lokasi=d.kode_lokasi "+
		             "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "inner join karyawan c on d.nik_buat=c.nik and d.kode_lokasi=c.kode_lokasi "+
					 "where a.tanggal<='"+this.dp_d1.getDateString()+"' and a.progress='0' and (a.status+d.progress='CLOSE3' or a.status+d.progress='OPEN2') ";			
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
			this.sg.appendData([line.status.toUpperCase(),line.no_ptg,line.tanggal,line.no_dokumen,line.no_panjar,floatToNilai(line.nilai_pj),floatToNilai(line.nilai),floatToNilai(line.nilai_kas),line.keterangan,line.pemegang,line.pp,line.sts_pj]);
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
							if(this.preView=="1"){
								this.nama_report="server_report_saku2_........";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_ver='"+this.e_nb.getText()+"' ";
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
							}else{
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); this.sg3.clear(1); 
			this.doClick();
			this.doLoad();
			this.e_memo.setText("-");
			this.pc1.setActivePage(this.pc1.childPage[0]);					
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});