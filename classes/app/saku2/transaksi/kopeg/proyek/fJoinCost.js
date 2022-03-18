window.app_saku2_transaksi_kopeg_proyek_fJoinCost = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_proyek_fJoinCost.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_proyek_fJoinCost";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Join Cost Project : Input", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,500], childPage:["Data Pengajuan","Detail Pengajuan","Filter Data"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:11,tag:0,
		            colTitle:["No Agenda","Tanggal","Modul","Bagian / Unit","Akun","DRK","Uraian","Nominal","Tgl Input","User","No KB"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[100,150,60,80,200,60,150,150,60,60,80]],
					readOnly:true,colFormat:[[7],[cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true,visible:false});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],visible:false}); 		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"No Join",maxLength:30,readOnly:true,visible:false});
		this.i_gen = new portalui_imageButton(this,{bound:[225,11,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"],visible:false});
		
		this.e_nokas = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,450,20],caption:"No KasBank", readOnly:true});						
		this.e_noaju = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,450,20],caption:"No Agenda", readOnly:true});						
		this.e_modul = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,13,450,20],caption:"Modul", readOnly:true});						
		this.e_akun = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,450,20],caption:"Akun", readOnly:true});								
		this.e_pp = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,15,450,20],caption:"Bagian/Unit", readOnly:true});												
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,450,20],caption:"Deskripsi", readOnly:true});								
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,450,20],caption:"Tanggal", readOnly:true});								
		this.e_tglinput = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,18,450,20],caption:"Tgl Input", readOnly:true});												
		this.e_user = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,450,20],caption:"User Input", readOnly:true});								
		this.e_total = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"Nilai Beban", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_totalcost = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,17,200,20],caption:"Total Sharing", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,290],colCount:5,tag:1,
		            colTitle:["ID Project","Nama Project","No SPK/PKS","Saldo Max Beban","Nilai Sharing"],
					colWidth:[[4,3,2,1,0],[100,100,300,200,120]],					
					columnReadOnly:[true,[0,1,2,3],[4]],
					buttonStyle:[[0],[bsEllips]], 
					colFormat:[[3,4],[cfNilai,cfNilai]],
					ellipsClick:[this,"doEllipsClick2"],change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange2"],
					autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});		
		
		this.e_nobukti = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,11,200,20],caption:"No Agenda",tag:9});
		this.e_ket2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,13,500,20],caption:"Keterangan",tag:9});
		this.e_nominal = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,200,20],caption:"Nominal", tipeText:ttNilai, text:"0",tag:9});		
		this.c_status2 = new saiCB(this.pc1.childPage[2],{bound:[20,10,200,20],caption:"Status Approval",items:["-"], readOnly:true,tag:9});
		this.bCari = new button(this.pc1.childPage[2],{bound:[230,10,80,18],caption:"Cari Data",click:[this,"doCari"]});			
				
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);	
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			var data = this.dbLib.getDataProvider("select convert(varchar,getdate(),103) as tgl ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.dp_d1.setText(line.tgl);
			}
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_proyek_fJoinCost.extend(window.childForm);
window.app_saku2_transaksi_kopeg_proyek_fJoinCost.implement({
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
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){								
								sql.add("insert into pr_joincost_d (no_aju,kode_lokasi,no_proyek,nilai,no_proyek_awal) values "+
								        "('"+this.e_noaju.getText()+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"',"+nilaiToFloat(this.sg2.cells(4,i))+",'-')");
								sql.add("insert into pr_beban_d(no_aju,kode_lokasi,periode,tanggal,kode_akun,kode_pp,kode_drk,keterangan,nilai,tgl_input,no_proyek,modul) "+
										"select no_aju,kode_lokasi,periode,tanggal,kode_akun,kode_pp,kode_drk,keterangan,"+nilaiToFloat(this.sg2.cells(4,i))+",tgl_input,'"+this.sg2.cells(0,i)+"','JOIN' "+
										"from it_aju_m where no_aju = '"+this.e_noaju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");							
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
					this.sg.clear(1); 					
					this.sg2.clear(1); 
					this.doLoad();					
					this.pc1.setActivePage(this.pc1.childPage[0]);						
					setTipeButton(tbSimpan);
				break;
			case "simpan" :					
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);								
				if (nilaiToFloat(this.e_totalcost.getText()) > nilaiToFloat(this.e_total.getText())) {
					system.alert(this,"Transaksi Sharing tidak valid.","Total Sharing melebihi Saldo Beban.");
					return false;						
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
				else
				this.simpan();
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
		this.doLoad();
	},			
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {
				this.sg2.clear(1);
				this.pc1.setActivePage(this.pc1.childPage[1]);						
				this.e_nb.setText(this.sg.cells(0,row));			
				this.e_noaju.setText(this.sg.cells(0,row));			
				this.e_modul.setText(this.sg.cells(2,row));			
				this.e_akun.setText(this.sg.cells(4,row));			
				this.e_pp.setText(this.sg.cells(3,row));			
				this.e_ket.setText(this.sg.cells(6,row));			
				this.e_tgl.setText(this.sg.cells(1,row));			
				this.e_tglinput.setText(this.sg.cells(8,row));			
				this.e_user.setText(this.sg.cells(9,row));						
				this.e_nokas.setText(this.sg.cells(10,row));											
				var strSQL = "select a.nilai-isnull(b.beban,0) as saldo "+
							 "from it_aju_m a "+
							 "  left join (select no_aju,kode_lokasi,sum(nilai) as beban from pr_joincost_d where no_aju='"+this.e_noaju.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by no_aju,kode_lokasi) b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_aju = '"+this.e_noaju.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";			
				var data = this.dbLib.getDataProvider(strSQL,true);	
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];								
					this.e_total.setText(floatToNilai(line.saldo));				
				}				
			}
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){				
		var strSQL = "select a.no_aju,convert(varchar,a.tanggal,103) as tgl,a.tanggal,a.modul,b.kode_pp+' - '+b.nama as pp,c.kode_akun+' - '+isnull(c.nama,'-') as akun,'-' as drk,a.keterangan,a.nilai-isnull(xx.pakai,0) as nilai,convert(varchar,a.tgl_input,103) as tgl_input,a.user_input as nik_user, a.no_kas as status "+
		             "from it_aju_m a "+					 
		             "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+					 					 
					 "left join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+					 
					 
					 "left join (select no_aju,kode_lokasi,sum(nilai) as pakai from pr_joincost_d where kode_lokasi='"+this.app._lokasi+"' group by no_aju,kode_lokasi) xx on a.no_aju=xx.no_aju and a.kode_lokasi=xx.kode_lokasi "+
					 
					 "where a.nilai-isnull(xx.pakai,0) >0 and a.kode_pp='"+this.app._kodePP+"' and a.periode<='"+this.e_periode.getText()+"' and ((a.progress = '3' and a.modul in ('UMUM','PJPTG')) or (a.progress = '4' and a.modul='PJPTG')) and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_aju";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);			
	},	
	doCari:function(sender){				
		var filter = "";		
		if (this.e_ket2.getText()!="") {
			filter = " where a.nilai-isnull(xx.pakai,0) >0 and ((a.progress = '3' and a.modul in ('UMUM','PJPTG')) or (a.progress = '4' and a.modul='PJPTG')) and a.keterangan like '%"+this.e_ket2.getText()+"%' and a.kode_lokasi='"+this.app._lokasi+"'";
		}
		else {
			if (this.e_nobukti.getText()!="") filter = " where a.nilai-isnull(xx.pakai,0) >0 and ((a.progress = '3' and a.modul in ('UMUM','PJPTG')) or (a.progress = '4' and a.modul='PJPTG')) and a.no_aju='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			if (nilaiToFloat(this.e_nominal.getText())!=0) filter = " where a.nilai-isnull(xx.pakai,0) >0 and ((a.progress = '3' and a.modul in ('UMUM','PJPTG')) or (a.progress = '4' and a.modul='PJPTG')) and a.nilai="+nilaiToFloat(this.e_nominal.getText())+" and a.kode_lokasi='"+this.app._lokasi+"'";				
		}		
		var strSQL = "select a.no_aju,convert(varchar,a.tanggal,103) as tgl,a.tanggal,a.modul,b.kode_pp+' - '+b.nama as pp,c.kode_akun+' - '+isnull(c.nama,'-') as akun,'-' as drk,a.keterangan,a.nilai-isnull(xx.pakai,0) as nilai,convert(varchar,a.tgl_input,103) as tgl_input,a.user_input as nik_user,a.no_kas as status  "+
		             "from it_aju_m a "+					 
		             "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+					 					 
					 "left join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
					 
					 "left join (select no_aju,kode_lokasi,sum(nilai) as pakai from pr_joincost_d where kode_lokasi='"+this.app._lokasi+"' group by no_aju,kode_lokasi) xx on a.no_aju=xx.no_aju and a.kode_lokasi=xx.kode_lokasi "+
					 
					 filter+" order by a.no_aju";					
		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},	
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];										
			this.sg.appendData([line.no_aju,line.tgl,line.modul,line.pp,line.akun,line.drk,line.keterangan,floatToNilai(line.nilai),line.tgl_input,line.nik_user,line.status.toUpperCase()]);
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
	doChangeCell2: function(sender, col, row){
		if (col == 0) {			
			var strSQL = "select a.no_dokumen,a.nilai_or-isnull(b.beban,0) as saldo "+
			             "from pr_proyek_m a "+
						 "  left join (select no_proyek,kode_lokasi,sum(nilai) as beban from pr_beban_d where no_proyek='"+this.sg2.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"' group by no_proyek,kode_lokasi) b on a.no_proyek=b.no_proyek and a.kode_lokasi=b.kode_lokasi "+
						 "where a.no_proyek = '"+this.sg2.cells(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";			
			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];				
				this.sg2.cells(2,row,line.no_dokumen);
				this.sg2.cells(3,row,floatToNilai(line.saldo));								
			}
		}
		if (col == 4) {			
			if (this.sg2.cells(4,row) != "") this.sg2.validasi();						
		}		
	},	
	doNilaiChange2: function(){
		try{			
			var tot = 0;
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(4,i) != ""){										
					tot += nilaiToFloat(this.sg2.cells(4,i));									
				}
			}									
			this.e_totalcost.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doEllipsClick2: function(sender, col, row){
		try{			
			if (sender == this.sg2) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Project",sender,undefined, 
						"select no_proyek, keterangan from pr_proyek_m where flag_aktif in ('1','2') and progress ='1' and kode_lokasi='"+this.app._lokasi+"'",
						"select count(no_proyek) from pr_proyek_m where flag_aktif in ('1','2') and progress ='1' and kode_lokasi='"+this.app._lokasi+"'",
						["no_proyek","keterangan"],"and",["ID Project ","Nama Project"],false);				
				}						
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
	
});