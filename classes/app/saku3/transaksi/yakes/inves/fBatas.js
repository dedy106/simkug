window.app_saku3_transaksi_yakes_inves_fBatas = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes_inves_fBatas.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes_inves_fBatas";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Batasan Alokasi Asset", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.c_tahun = new saiCB(this,{bound:[20,12,180,20],caption:"Tahun",tag:2,change:[this,"doChange"]});	
		this.i_gen = new portalui_imageButton(this,{bound:[205,12,20,20],hint:"Copy Thn-1",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doCopy"]});
		this.cb_plan = new saiCBBL(this,{bound:[20,15,200,20],caption:"Plan Asset", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});		
				
		this.p1 = new panel(this,{bound:[20,23,800,300],caption:"Data Batasan"});
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:6,tag:9,				
				colTitle:["Kode","Nama Kelas","% Min","% Acuan","% Maks","Akhir Tahun-1"],
				colWidth:[[5,4,3,2,1,0],[150,100,100,100,200,80]],				
				columnReadOnly:[true,[0,1],[2,3,4,5]],		
				colFormat:[[2,3,4,5],[cfNilai,cfNilai,cfNilai,cfNilai]],						
				defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg});				
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		this.dataAkun = this.app._masakun;
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.cb_plan.setSQL("select kode_plan, nama from inv_plan",["kode_plan","nama"],false,["Kode","Nama"],"where","Daftar Plan Asset",true);			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('PLAN') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					if (line.kode_spro == "PLAN") this.cb_plan.setText(line.flag);													
				}
			}

			this.c_tahun.items.clear();
			var str = "select distinct substring(periode,1,4) as tahun, year(getdate()) as tahun_ini from periode where kode_lokasi ='"+this.app._lokasi+"' union select distinct substring(periode,1,4)+1 as tahun, year(getdate()) as tahun_ini from periode where kode_lokasi ='"+this.app._lokasi+"' order by tahun desc";
			var data = this.dbLib.getDataProvider(str,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;				
				for (var i in data.rs.rows){
					line = data.rs.rows[i];													
					this.c_tahun.addItem(i,line.tahun);
				}
			} 

			this.c_tahun.setText(line.tahun_ini);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes_inves_fBatas.extend(window.childForm);
window.app_saku3_transaksi_yakes_inves_fBatas.implement({
	doCopy: function() {
		var thnSeb = nilaiToFloat(this.c_tahun.getText()) - 1;
		thnSeb = thnSeb.toString();
		strSQL = "select *,round(nilai,0) as nab from inv_batas_alokasi where kode_plan='"+this.cb_plan.getText()+"' and tahun='"+thnSeb+"' order by nu ";									
		var data1 = this.dbLib.getDataProvider(strSQL,true);	
		if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
			var line1;
			this.sg.clear();
			for (var i in data1.rs.rows){
				line1 = data1.rs.rows[i];																													
				this.sg.appendData([line1.kode_kelas,line1.nama,floatToNilai(line1.bawah),parseFloat(line1.acuan),parseFloat(line1.atas),parseFloat(line1.nab)]);
			}
		} else this.sg.clear(1);
	},
	doLoad: function() {
		strSQL = "select * from inv_batas_alokasi where kode_plan='"+this.cb_plan.getText()+"' and tahun='"+this.c_tahun.getText()+"' order by nu ";							
		var data1 = this.dbLib.getDataProvider(strSQL,true);	
		if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
			var line1;
			this.sg.clear();
			for (var i in data1.rs.rows){
				line1 = data1.rs.rows[i];																													
				this.sg.appendData([line1.kode_kelas,line1.nama,floatToNilai(line1.bawah),parseFloat(line1.acuan),parseFloat(line1.atas),parseFloat(line1.sawal_tahun)]);
			}
		} else this.sg.clear(1);
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from inv_batas_alokasi where kode_plan = '"+this.cb_plan.getText()+"' and tahun='"+this.c_tahun.getText()+"'");			
					
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)) 
							sql.add("insert into inv_batas_alokasi (kode_plan,kode_kelas,nama,bawah,acuan,atas,nilai,n_max,persen,nu,sawal_tahun,tahun) values "+
									"('"+this.cb_plan.getText()+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"',"+nilaiToFloat(this.sg.cells(2,i))+","+nilaiToFloat(this.sg.cells(3,i))+","+nilaiToFloat(this.sg.cells(4,i))+",0,0,0,"+i+","+nilaiToFloat(this.sg.cells(5,i))+",'"+this.c_tahun.getText()+"')");
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_plan);
					this.sg.clear(1); 
					this.doLoad();
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;					
		}
	},
	doChange: function(sender){
		try{
			if ((sender == this.cb_plan || sender ==this.c_tahun) && this.cb_plan.getText() != "" && this.c_tahun.getText() != ""){						
				this.doLoad();							
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},			
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.cb_plan.getText()+")");							
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